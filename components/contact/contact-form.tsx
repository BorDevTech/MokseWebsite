"use client";

import {
  Button,
  Card,
  Container,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmissionStatus {
  type: "success" | "error" | null;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>({
    type: null,
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("@/app/(API Routes)/api/contact/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you for your message! We will get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="3xl" py={8}>
      <Card.Root>
        <Card.Body>
          <Fieldset.Root>
            <Stack>
              <Fieldset.Legend>Contact Us</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your contact details below.
              </Fieldset.HelperText>
            </Stack>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Email address</Field.Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Subject</Field.Label>
                <Input
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Message</Field.Label>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </Field.Root>

              {status.type && <div>{status.message}</div>}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit"}
              </Button>
            </Fieldset.Content>
          </Fieldset.Root>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message">Comment or Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>

            {status.type && <div>{status.message}</div>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
