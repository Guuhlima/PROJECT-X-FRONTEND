'use client'

import Button from "@/app/shared/components/Button/Button"

type ProfileSidebarProps = {
  name: string
  email: string
  avatarUrl?: string
  onEdit: () => void
}

export function ProfileSidebar({ name, email, avatarUrl, onEdit }: ProfileSidebarProps) {
  return (
    <aside className="rounded-xl border border-border bg-background p-6 lg:sticky lg:top-6 mt-36">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-muted">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-semibold">
              {name.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">{name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>

        <Button className="w-full" type="button" onClick={onEdit}>
          Edit Profile
        </Button>
      </div>
    </aside>
  )
}