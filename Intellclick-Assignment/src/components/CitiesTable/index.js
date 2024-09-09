import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './index.css';
import CityCard from '../CityCard';

const CitiesTable = () => {
  const [cityData, setCityData] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSortedAsc, setIsSortedAsc] = useState(true);

  useEffect(() => {
    fetchCities();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [searchQuery, cityData]);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${page * 20}`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const newCities = data.results.map((result) => ({
          geonameId: result.geoname_id, // Correct ID access
          name: result.name,
          cou_name_en: result.cou_name_en,
          timezone: result.timezone || 'N/A',
        }));

        setCityData((prevCities) => [...prevCities, ...newCities]);
        
        if (newCities.length < 20) {
          setHasMore(false); 
        }
      } else {
        setHasMore(false); 
        console.error('No results found in the API response');
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  
  const handleSearch = () => {
    const filtered = cityData.filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  
  const handleSortToggle = () => {
    const sortedCities = [...filteredCities].sort((a, b) => {
      if (isSortedAsc) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredCities(sortedCities);
    setIsSortedAsc(!isSortedAsc); 
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search City..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      
      <button className='button' onClick={handleSortToggle}>
        Sort by City Name ({isSortedAsc ? 'Ascending' : 'Descending'})
      </button>

      <InfiniteScroll
        dataLength={cityData.length} 
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more cities to load</b>
          </p>
        }
      >
        <div className="table-container">
          <table border="1">
            <thead>
              <tr>
                <th>City Name</th>
                <th>Country</th>
                <th>Timezone</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.map((eachCity, index) => (
                <CityCard key={`${eachCity.geonameId}-${index}`} dataDetails={eachCity} />
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CitiesTable;
