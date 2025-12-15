'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { signUp } from '@/config/auth-client';
import { useState } from 'react';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [form, setData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: '',
    email: '',
    password: '',
  });

  const onSubmit = async () => {
    const { data, error } = await signUp.email(
      {
        email: form.email,
        password: form.password,
        name: form.name,
        username: 'test' + Date.now().toString(),
        gender: 'MALE',
        phoneNumber: 'ddddd',

        callbackURL: '/home', // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log('EEEEEE');
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log('SSSSSSSSS');
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
    console.log(data, 'SSSSS');
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    name: e.target.value as string,
                  }))
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={form.email}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    email: e.target.value as string,
                  }))
                }
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                name={form.password}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    password: e.target.value as string,
                  }))
                }
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            {/* <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field> */}
            <FieldGroup>
              <Field>
                <Button type="button" onClick={onSubmit}>
                  Create Account
                </Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
