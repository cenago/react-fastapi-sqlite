import React, { useState, useEffect } from 'react';

// 1. Define the response structure matching your FastAPI return value
interface NewCompData {
  name: string;
}

const NewComp: React.FC = () => {
  // 2. Pass the type to useState so TypeScript knows 'data' can be NewCompData or null
  const [data, setData] = useState<NewCompData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:8000/new_comp')
      .then((res) => res.json())
      .then((data: NewCompData) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h2>NewComp</h2>
      {data && <p>Name: {data.name}</p>}
    </>
  );
};

export default NewComp;