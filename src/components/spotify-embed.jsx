export default function SpotifyEmbed({ src = '' }) {
  return (
    <iframe
      data-testid="embed-iframe"
      style={{ borderRadius: '12px' }}
      src="https://open.spotify.com/embed/playlist/5Zay8qZijmkey3l2vaYoKe?utm_source=generator&theme=0"
      width="100%"
      height="152"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  )
}
