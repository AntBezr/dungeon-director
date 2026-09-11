import { AlertTriangle, LogOut, RefreshCcw, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useResetDemoData } from '@entities/game'
import { ROUTES } from '@shared/models/routes'
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

export function ProfilePage() {
  const navigate = useNavigate()
  const resetDemoData = useResetDemoData()
  const [username, setUsername] = useState('Game Master')
  const [isResetPending, setIsResetPending] = useState(false)

  async function resetData() {
    await resetDemoData.mutateAsync()
    setIsResetPending(false)
    void navigate(ROUTES.GAMES)
  }

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <header>
          <p className="text-sm font-medium text-primary">Profile</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Game master settings
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This is demo mode. Server actions are not live yet.
          </p>
        </header>
        <div className="mt-8 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-5 text-primary" aria-hidden="true" />
                Profile
              </CardTitle>
              <CardDescription>
                This name will be stored in the future Django profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="profile-username">Game master name</Label>
                <Input
                  id="profile-username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <Button type="button" variant="outline">
                Save in demo
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Password and account</CardTitle>
              <CardDescription>
                Password changes and account deletion will arrive with server
                authentication.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" disabled>
                Change password
              </Button>
              <Button
                type="button"
                variant="outline"
                className="text-destructive"
                disabled
              >
                Delete account
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => void navigate(ROUTES.LOGIN)}
              >
                <LogOut className="size-4" aria-hidden="true" />
                Leave demo
              </Button>
            </CardContent>
          </Card>
          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle
                  className="size-5 text-destructive"
                  aria-hidden="true"
                />
                Reset demo data
              </CardTitle>
              <CardDescription>
                Restore the demo campaign, 126 sessions, and starter scenes.
                Local changes will be lost.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isResetPending ? (
                <div className="flex flex-col gap-3 rounded-lg bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm">Reset all data on this device?</p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsResetPending(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        void resetData()
                      }}
                      disabled={resetDemoData.isPending}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsResetPending(true)}
                >
                  <RefreshCcw className="size-4" aria-hidden="true" />
                  Reset demo data
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
