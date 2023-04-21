<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Oops! Page Not Found</h2>
    <p>Sorry, but the page you are looking for does not exist.</p>
    <router-link to="/" class="backlink">Go back to homepage</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
  font-size: 3rem;
}

.not-found p {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.backlink {
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid #2b3b49;
  background-color: #2b3b49;
  color: #fff;
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

.back-link:hover {
  background-color: #fff;
  color: #2b3b49;
}
</style>
