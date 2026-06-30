import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Sultanpur Rental | Rooms, Flats, Houses, PG & Shops for Rent in Sultanpur',
      },
      {
        name: 'description',
        content:
          'Find verified rooms, flats, houses, PGs, hostels and shops for rent in Sultanpur. Connect directly with property owners and find your perfect home.',
      },
      {
        name: 'keywords',
        content:
          'room for rent in Sultanpur, flat for rent in Sultanpur, pg in Sultanpur, hostel in Sultanpur, house for rent in Sultanpur, shop for rent in Sultanpur',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
