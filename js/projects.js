const username = 'ETAModder';
const repoList = document.getElementById('repo-list');

fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
  .then(res => res.json())
  .then(repos => {
    repos.forEach(repo => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${repo.html_url}" target="_blank"><strong>${repo.name}</strong></a>
        Stars ${repo.stargazers_count}
        ${repo.language ? `• <span class="language">${repo.language}</span>` : ''}
        <p>${repo.description || ''}</p>
      `;
      repoList.appendChild(li);
    });
  })
  .catch(err => console.error('fetch error :( >>>', err));
