<script>
    import Token from './token.svelte';

    export let tokens;
    export let highlightedTokens;

    function toggleHighlight(token) {
      if (highlightedTokens.has(token.id)) {
        highlightedTokens.delete(token.id);
      } else {
        highlightedTokens.add(token.id);
      }
      highlightedTokens = highlightedTokens; // trigger reactivity
    }

  </script>
  
  {#if tokens.length > 0}
    <div class="tokenized-text">
      {#each tokens as token}
        <Token
          {token}
          isHighlighted={highlightedTokens.has(token.id)}
          onToggleHighlight={toggleHighlight}
        />
      {/each}
    </div>
  {/if}
  
  <style>
    .tokenized-text {
      margin-top: 10px;
      padding: 10px;
      border: .5px solid #000;
      border-radius: 5px;
      line-height: 1.5;
    }
  </style>
  