export default function AuthCard({ title, children }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-8 sm:max-w-lg sm:px-6">
      <div className="rounded-lg border-8 border-blue-primary bg-white p-6 shadow-md sm:p-8">
        <h1 className="mb-6 text-center font-anton text-3xl font-black text-blue-primary sm:text-4xl">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}
