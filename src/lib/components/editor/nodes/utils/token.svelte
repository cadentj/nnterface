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
    cursor: text;
    user-select: none;
    padding: 2px 0px;
    /* margin: 2px; */
    border-radius: 3px 3px 0 0; /* Top-left and top-right corners rounded */
    background-color: #ffdd57; /* Light yellow background */
    border: .25px solid #0000006e;
    position: relative;
  }

  .highlighted {
    background-color: #ffa500; /* Highlight color */
  }

  .token::before {
    content: "";
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
    height: 4px;
    background-color: #ffdd57;
    border-radius: 0 0 50% 50%; /* Bottom-left and bottom-right corners rounded */
    z-index: -1;
  }
</style>