<script lang="ts">
    import type { Bird } from "./game";
    export let bird: Bird;
</script>

<style>
    #bird {
        border: 1px solid black;
        background-color: yellow;
        position: absolute;
    }
</style>

<section
    style="width:{bird.size}px; height:{bird.size}px; top:{bird.top}px; left:{bird.left}px;"
    id="bird" />
