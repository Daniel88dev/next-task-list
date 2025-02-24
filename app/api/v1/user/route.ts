import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import {
  insertUser,
  onUserDeleted,
  updateUser,
  UserDataType,
} from "@/drizzle/user";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  if (eventType === "user.created") {
    const emailArrayId = evt.data.primary_email_address_id!;

    const findEmailAddress = evt.data.email_addresses.find(
      (email) => email.id === emailArrayId
    );

    if (!findEmailAddress) {
      return new Response("Error: Could not find email address", {
        status: 400,
      });
    }

    const userData: UserDataType = {
      firstName: evt.data.first_name!,
      lastName: evt.data.last_name!,
      email: findEmailAddress.email_address,
      clerkId: evt.data.id!,
    };

    const submitUser = await insertUser(userData);

    if (!submitUser) {
      return new Response("Error: Could not submit user", { status: 400 });
    }

    return new Response("User registered", { status: 200 });
  } else if (eventType === "user.updated") {
    const emailArrayId = evt.data.primary_email_address_id!;

    const findEmailAddress = evt.data.email_addresses.find(
      (email) => email.id === emailArrayId
    );

    if (!findEmailAddress) {
      return new Response("Error: Could not find email address", {
        status: 400,
      });
    }

    const firstName = evt.data.first_name!;
    const lastName = evt.data.last_name!;
    const clerkId = evt.data.id!;

    const submitUserUpdate = await updateUser(
      firstName,
      lastName,
      findEmailAddress.email_address,
      clerkId
    );

    if (!submitUserUpdate) {
      return new Response("Error: Could not submit user update", {
        status: 400,
      });
    }

    return new Response("User updated", { status: 200 });
  } else if (eventType === "user.deleted") {
    const clerkId = evt.data.id!;

    const submitUserDelete = await onUserDeleted(clerkId);

    if (!submitUserDelete) {
      return new Response("Error: Could not submit user delete", {
        status: 400,
      });
    }

    return new Response("User deleted", { status: 200 });
  }

  return new Response("Webhook received", { status: 200 });
}
