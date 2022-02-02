const IndexPage = () => (
  <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
    <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
      <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
        <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
          <li className="py-2 hover:bg-indigo-300 rounded">
            <a className="truncate" href="#">
              <img
                src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg"
                className="w-7 sm:mx-2 mx-4 inline"
              />
              <span className="hidden sm:inline">Home</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
      <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">
        Single-page App Layout
      </h1>
      <p className="py-2 text-xl">
        This single-page "app" style layout features a{" "}
        <span className="font-bold">sidebar</span>,{" "}
        <span className="font-bold">main</span>
        content area, and <span className="font-bold">footer</span>. This
        full-height layout is never more than viewport height. The content area
        scrolls independently as needed. For this example, we're using the{" "}
        <a className="text-indigo-600" href="https://tailwindcss.com/">
          Tailwind CSS
        </a>
        utility framework. As part of it's default classNamees, Tailwind
        includes Flexbox classNamees which make this layout implementation
        simple!
      </p>
      <p className="py-2 text-xl">
        Additionally, this layout is <span className="italic">responsive</span>.
        As screen width decreases down to 640px (the smallest Tailwind
        breakpoint), the layout stacks vertically. The sidebar orientation is
        flipped from vertical to horizontal (<code>flex-col sm:flex-row</code>
        ), and the main content area fills the remaining height above the
        footer.
      </p>
    </main>
  </div>
);

export default IndexPage;
