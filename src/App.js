import React, { useState } from 'react';
import Button from './components/Button';
import Input from './components/input';
import ItemRepo from './components/ItemRepo';
import { Container } from './styles/styles';
import { api } from "./services/api"

function App() {
  const [currentRepo, setCurrentRepo] = useState('')
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`)
    if (data.id) {

      const isExist = repos.find(repo => repo.id === data.id)

      if (!isExist) {
        setRepos(prev => [...prev, data])
        setCurrentRepo('')
        console.log(repos);
        return
      }
    }
    else {
      alert('Repositório não encontrado')
    }
  }

  const handleRemoveRepo = (id) => {
    setRepos(repos.filter(repo => repo.id !== id))
    //usar filter
  }

  return (
    <Container>
      <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='Github logo' width={72} height={72} />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;
