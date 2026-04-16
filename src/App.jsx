import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Contacts from './components/Contacts.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="grain min-h-screen bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contacts />
      </main>
      <Footer />
    </div>
  )
}
