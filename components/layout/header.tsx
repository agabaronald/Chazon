'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Search, Menu, X, User, Bell, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function Header() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-chazon-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CH</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Chazon</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="What do you need help with?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-chazon-primary focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/services"
              className="text-gray-700 hover:text-chazon-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/become-steward"
              className="text-gray-700 hover:text-chazon-primary transition-colors"
            >
              Become a Steward
            </Link>

            {status === 'loading' ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    3
                  </Badge>
                </Button>

                {/* Messages */}
                <Button variant="ghost" size="sm" className="relative">
                  <MessageSquare className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-chazon-primary text-white text-xs">
                    2
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                        <AvatarFallback>
                          {session.user?.name?.charAt(0) || <User className="w-4 h-4" />}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {session.user?.name && (
                          <p className="font-medium">{session.user.name}</p>
                        )}
                        {session.user?.email && (
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {session.user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/bookings">My Bookings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={(event) => {
                        event.preventDefault()
                        signOut()
                      }}
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => signIn()}>
                  Log in
                </Button>
                <Button onClick={() => signIn()} className="bg-chazon-primary hover:bg-chazon-primary-dark">
                  Sign up
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="What do you need help with?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <Link
              href="/services"
              className="block px-3 py-2 text-gray-700 hover:text-chazon-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/become-steward"
              className="block px-3 py-2 text-gray-700 hover:text-chazon-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Become a Steward
            </Link>
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-chazon-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-gray-700 hover:text-chazon-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    signOut()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-chazon-primary"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    signIn()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-chazon-primary"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    signIn()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-white bg-chazon-primary rounded-md"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}