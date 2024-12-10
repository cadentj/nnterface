<script lang="ts">
    let items = ["new", "node-connections", "chat", "lens", "steering", "patching"];
</script>

<div class="editor-container flex flex-col items-center justify-center">
<pre class="text-border  text-white text-lg transform  z-10">          ,--.                                
        ,--.'|    ,---,       ,---,    ,---,. 
    ,--,:  : |  .'  .' `\  ,`--.' |  ,'  .' | 
 ,`--.'`|  ' :,---.'     \ |   :  :,---.'   | 
 |   :  :  | ||   |  .`\  |:   |  '|   |   .' 
 :   |   \ | ::   : |  '  ||   :  |:   :  :   
 |   : '  '; ||   ' '  ;  :'   '  ;:   |  |-, 
 '   ' ;.    ;'   | ;  .  ||   |  ||   :  ;/| 
 |   | | \   ||   | :  |  ''   :  ;|   |   .' 
 '   : |  ; .''   : | /  ; |   |  ''   :  '   
 |   | '`--'  |   | '` ,/  '   :  ||   |  |   
 '   : |      ;   :  .'    ;   |.' |   :  \   
 ;   |.'      |   ,.'      '---'   |   | ,'   
 '---'        '---'                `----'     </pre>
    <ul class="text-center w-[20vw] z-10">
        {#each items as item}
            <li class="text-left p-3 my-2 border-white border rounded-lg" >
                <a href="/nnterface/editor/{item}">
                    {item}
                </a>
            </li>
        {/each}
    </ul>
    <div class="gradient-overlay" />
    <div class="dark-overlay" />
</div>



<style>
    .editor-container {
        position: relative;
        width: 100%;
        height: 100vh;
    }

    .gradient-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            ellipse at 30% 30%,
            #36B1FE 0%,
            rgba(54, 177, 254, 0.7) 30%,
            rgba(193, 108, 203, 0.7) 70%,
            #C16CCB 100%
        );
        animation: pulse 8s ease-in-out infinite;
    }

    @keyframes pulse {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.8;
            transform: scale(1.05);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .dark-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
    }
</style>