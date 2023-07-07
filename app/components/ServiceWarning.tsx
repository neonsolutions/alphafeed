export function ServiceWarning() {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
      <p className="mb-2">30 June 2023</p>
      <p className="font-bold mb-2">Service Announcement</p>

      <p>
        We are experiencing issues ingesting posts from Twitter, our main source of information at this stage, due to a
        change in their content policies. We are working on a solution to this problem and will update this page when we
        have more information.
      </p>
    </div>
  )
}
