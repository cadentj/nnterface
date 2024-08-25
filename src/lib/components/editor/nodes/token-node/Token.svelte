<script>
  export let token;
  export let isHighlighted = false;
  export let onToggleHighlight;

  function handleClick() {
    onToggleHighlight(token);
  }
</script>

<button
  class="token"
  class:highlighted={isHighlighted}
  on:mousedown={(e) => handleClick()}
  on:mouseenter={(e) => e.buttons && handleClick()}
>
  {token.text}
</button>

<style>
  .token {
    display: inline;
    cursor: pointer;
    user-select: none;
    border: 1px solid #0000006e;
  }

  .highlighted {
    background-color: yellow;
  }
</style>
