export default function CreateFeedPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Custom Feed</h1>
          <p className="text-gray-600 mb-6">Create a personalized feed by combining multiple communities.</p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Feed Name</label>
              <input
                type="text"
                placeholder="My Custom Feed"
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Communities</label>
              <input
                type="text"
                placeholder="Add communities to your feed..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">Create Feed</button>
          </form>
        </div>
      </div>
    </div>
  )
}
