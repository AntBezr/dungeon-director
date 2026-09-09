import { Link } from 'react-router-dom'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from 'ui'

import { ROUTES } from '@shared/models/routes'

export function LoginPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-muted p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Enter your account details to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
            <Button type="button" variant="outline" className="w-full">Continue with Google</Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? <Link to={ROUTES.HOME} className="text-primary hover:underline">Explore campaigns</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
