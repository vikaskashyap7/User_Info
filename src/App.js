import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState([]);

  useEffect(() => {
    fetchUsers();
    // Retrieve past searches from local storage on component mount
    const pastSearchesData = localStorage.getItem('pastSearches');
    if (pastSearchesData) {
      setPastSearches(JSON.parse(pastSearchesData));
    }
  }, []);

  // Function to fetch users data from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  // Function to search user by name
  const searchUser = () => {
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setUsers(filteredUsers);
    // Add search term to past searches
    setPastSearches(prevSearches => [...prevSearches, searchTerm]);
    // Store past searches in local storage
    localStorage.setItem('pastSearches', JSON.stringify([...pastSearches, searchTerm]));
  }

  // Function to sort users by name
  const sortByName = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  }

  // Function to show past search terms
  const showPastSearches = () => {
    alert('Past Searches: ' + pastSearches.join(', '));
  }

  return (
    <div className='w-full h-screen  bg-slate-800'>
      <h1 className=' pt-7 text-center text-5xl font-serif font-[450] text-gray-400'>User Information</h1>
      <div className=' flex flex-row justify-center pt-10 w-full] h-[10%] gap-4'>
        <input className='w-[35%] h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by name..." />
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={searchUser}>Search</button>
        <button className=' text-zinc-800 bg-green-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5  text-center dark:hover:bg-lime-400 ' onClick={showPastSearches}>Show Past Searches</button>
        <button className='text-white bg-teal-900 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5  text-center  dark:hover:bg-teal-400 dark:focus:ring-teal-900' onClick={sortByName}>Sort by Name</button>
      </div>
      <div className=' w-full pt-14 flex flex-col pl-80'>
          <ul className='gap-3 flex flex-col'>
            {users.map(user => (
              <li className=' text-slate-100 text-xl font-serif font-[300]' key={user.id}>{user.name}</li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default App;





