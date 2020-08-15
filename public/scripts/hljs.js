document.addEventListener('DOMContentLoaded', event => {
  document.querySelectorAll('.__dumi-default-code-block pre').forEach(block => {
    hljs.highlightBlock(block);
  });
});
