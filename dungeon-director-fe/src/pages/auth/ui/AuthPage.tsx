import { LogIn, Sparkles, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from 'ui'

import { ROUTES } from '@shared/models/routes'

export function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const isRegistration = location.pathname === ROUTES.REGISTER
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!username.trim() || !password) {
      setError('Enter a game master name and password.')
      return
    }

    if (isRegistration && password !== confirmation) {
      setError('Passwords do not match.')
      return
    }

    // Demo mode does not store or validate a real password.
    void navigate(ROUTES.GAMES)
  }

  return (
    <main className="grid min-h-svh place-items-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-3 grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
            {isRegistration ? (
              <UserPlus className="size-5" aria-hidden="true" />
            ) : (
              <LogIn className="size-5" aria-hidden="true" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isRegistration ? 'Create game master profile' : 'Sign in'}
          </CardTitle>
          <CardDescription>
            {isRegistration
              ? 'Registration will be connected to the Django API later.'
              : 'Sign in to the game master demo.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-2">
              <Label htmlFor="username">Game master name</Label>
              <Input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={
                  isRegistration ? 'new-password' : 'current-password'
                }
              />
            </div>
            {isRegistration && (
              <div className="grid gap-2">
                <Label htmlFor="confirmation">Confirm password</Label>
                <Input
                  id="confirmation"
                  type="password"
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  autoComplete="new-password"
                />
              </div>
            )}
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full">
              {isRegistration ? 'Continue' : 'Sign in'}
            </Button>
          </form>
          <div className="mt-5 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2 font-medium text-foreground">
              <Sparkles className="size-4 text-primary" aria-hidden="true" />
              Demo mode
            </p>
            <p className="mt-1">
              Real passwords are not stored in the browser.
            </p>
            <Button
              asChild
              variant="link"
              size="sm"
              className="mt-2 h-auto px-0"
            >
              <Link to={ROUTES.GAMES}>Open demo</Link>
            </Button>
          </div>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            {isRegistration ? 'Already have a profile?' : 'New here?'}{' '}
            <Link
              className="text-primary hover:underline"
              to={isRegistration ? ROUTES.LOGIN : ROUTES.REGISTER}
            >
              {isRegistration ? 'Sign in' : 'Create profile'}
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
