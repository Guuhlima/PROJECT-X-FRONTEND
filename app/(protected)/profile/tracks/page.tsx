'use client'

import { ProfileSidebar } from "./components/ProfileSidebar"

export default function Page() {
  return (
    <div className="min-h-screen bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
                <ProfileSidebar
                    name="Gustavo"
                    email="GustavoLima@gmail.com"
                    onEdit={() => {}}
                />
            </div>
        </div>
    </div>
  )
}
