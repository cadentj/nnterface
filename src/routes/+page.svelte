<script lang="ts">
    import Logo from "$lib/images/ndif.png";
</script>

<div class="editor-container">
    <!-- <img src={Logo} alt="Nnsight Logo" class="h-[40vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" /> -->

<pre class="text-border absolute text-white text-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">          ,--.                                
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
        background-color: rgba(0, 0, 0, 0.70);
    }
</style>