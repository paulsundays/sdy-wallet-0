import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-200 py-4">
      <div className="container mx-auto px-4 text-center text-sm text-slate-600">
        <Link
          href="https://paulsundays.com/terms-and-conditions.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-pink-600 mr-4"
        >
          Términos y Condiciones
        </Link>
        <Link
          href="https://paulsundays.com/privacy-policy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-pink-600"
        >
          Política de Privacidad
        </Link>
      </div>
    </footer>
  )
}
