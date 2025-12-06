const Sidebar = () => {
    return (
        <div className="p-4 space-y-3">
            <h2 className="text-xl font-bold mb-4">Dashboard Menu</h2>

            <ul className="space-y-2">
                <li>
                    <a className="block p-2 bg-base-200 rounded">User Home</a>
                </li>
                <li>
                    <a className="block p-2 bg-base-200 rounded">My Lessons</a>
                </li>
                <li>
                    <a className="block p-2 bg-base-200 rounded">Add Lesson</a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
