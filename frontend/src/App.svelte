<script>
  import { onMount } from 'svelte';
  import { request, gql } from 'graphql-request';

  let users = [];
  let pagination = {
    totalOfPage: 0,
    page: 0,
    totalOfRecord: 0,
    pageSize: 0,
  };

  let username = '';
  let loading = false;

  const getUsers = async (page, pageSize) => {
    try {
      loading = true;
      const query = gql`
        query GetUsers($page: Int, $pageSize: Int) {
          Users(page: $page, pageSize: $pageSize) {
            data {
              id
              username
            }
            meta {
              pagination {
                totalOfPage
                page
                totalOfRecord
                pageSize
              }
            }
          }
        }
      `;

      const variables = { page, pageSize };
      const data = await request('http://localhost:4000/graphql', query, variables);
      users = data.Users.data;
      pagination = data.Users.meta.pagination;
      loading = false;
    } catch (error) {
      loading = false;
    }
  };

  const createUser = async () => {
    const mutation = gql`
      mutation CreateUser($username: String!) {
        createUser(username: $username) {
          id
          username
        }
      }
    `;

    try {
      const data = await request('http://localhost:4000/graphql', mutation, { username });
      getUsers(pagination.page, pagination.pageSize);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const displayPagination = () => {
    const { totalOfPage } = pagination;

    let paginationButtons = [];
    for (let i = 1; i <= totalOfPage; i++) {
      paginationButtons.push({
        pageNumber: i,
        button: i,
      });
    }

    return paginationButtons;
  };

  onMount(() => {
    getUsers(1, 10);
  });
</script>

<h2>User List</h2>

{#if loading}
  <p>Loading...</p>
{:else if users.length > 0}
  <ul>
    {#each users as user}
      <li>User ID: {user.id}, Username: {user.username}</li>
    {/each}
  </ul>
{:else}
  <p>No users available</p>
{/if}

<div>
  <p>
    Page {pagination.page} of {pagination.totalOfPage}, {pagination.totalOfRecord}{' '}
    users in total
  </p>
  {#each displayPagination() as { pageNumber, button }}
    <button on:click={() => getUsers(pageNumber, pagination.pageSize)}>{button}</button>
  {/each}
</div>

<div>
  <label for="username">Username:</label>
  <input type="text" id="username" bind:value={username} />
  <button on:click={createUser}>Create User</button>
</div>
