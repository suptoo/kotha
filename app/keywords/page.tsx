export default function KeywordsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Add Keywords</h1>
          <p className="text-gray-600 mb-6">Add keywords to customize your feed and discover relevant content.</p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter keywords..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">Add Keywords</button>
          </div>
        </div>
      </div>
    </div>
  )
}
