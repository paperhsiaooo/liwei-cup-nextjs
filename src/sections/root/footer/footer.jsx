const Footer = ({
  copyright = '© 2025 #リキイ盃 All rights reserved.',
  bottomLinks = [
    { text: '服務條款', url: '/terms' },
    { text: '隱私權政策', url: '/privacy' },
    { text: '消費者權益', url: '/consumer-rights' },
    { text: '退換貨政策', url: '/return-policy' },
  ],
}) => {
  return (
    <section className="bg-[#F9F9F9]">
      <div className="wrapper">
        <footer>
          <div className="text-muted-foreground flex flex-col justify-between gap-8 border-t py-4 text-sm font-medium 1440:flex-row 1440:items-center 1440:py-8">
            <p className="font-noto-sans-jp">{copyright}</p>
            <ul className="flex flex-col gap-4 1440:flex-row">
              {bottomLinks.map((link, linkIdx) => (
                <li
                  key={linkIdx}
                  className="hover:text-primary underline font-noto-sans-tc"
                >
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Footer
