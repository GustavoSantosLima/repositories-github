import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from './../../services/api';
import Container from '../../Components/Container';

import { BoxActions, Form, MainButton, List } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) this.setState({ repositories: JSON.parse(repositories) });
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleRemove = id => {
    this.setState({
      repositories: this.state.repositories.filter(repo => repo.id !== id),
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const { data } = await api.get(`repos/${newRepo}`);

    this.setState({
      newRepo: '',
      repositories: [...repositories, data],
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, repositories } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            value={newRepo}
            onChange={this.handleChange}
            placeholder="Adicionar Repositório"
          />

          <MainButton loaded={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </MainButton>
        </Form>

        <List>
          {repositories.map((repository, key) => (
            <li key={key}>
              {repository.full_name}
              <BoxActions>
                <Link
                  to={`/repository/${encodeURIComponent(repository.full_name)}`}
                >
                  Detalhes
                </Link>
                <span>-</span>
                <a href onClick={() => this.handleRemove(repository.id)}>
                  Remover
                </a>
              </BoxActions>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
