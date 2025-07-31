export default function CommunitiesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Manage Communities</h1>
          <p className="text-gray-600 mb-6">View and manage the communities you've joined or created.</p>
          <div className="text-center py-8">
            <p className="text-gray-500">No communities to manage yet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
