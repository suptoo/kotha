export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
              <p className="text-gray-600">Manage your account settings</p>
            </div>
          </div>
          <p className="text-gray-600">Profile settings and user information will be displayed here.</p>
        </div>
      </div>
    </div>
  )
}
