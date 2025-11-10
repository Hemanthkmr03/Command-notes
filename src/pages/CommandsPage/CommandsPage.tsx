import CommandCard from '../../components/CommandCard/CommandCard';
import './CommandsPage.scss'
import { useEffect, useState } from 'react';
import { DATA_ENDPOINT } from '../../constant.js'

const CommandsPage: React.FC = () => {
  const [commandsList, setCommandList] = useState([])
  console.log(commandsList[0]);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(DATA_ENDPOINT);
        const data = await res.json()
        // console.log(data);
        setCommandList(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])


  return (
    <div>
      <CommandCard commandsList={commandsList} />
    </div>
  )
}

export default CommandsPage