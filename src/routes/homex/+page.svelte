<script>
    import { homeIcon, exploreIcon, bookmarkIcon, messageIcon, profileIcon } from './Icons.js';

</script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<style>
    :global(body){
        background-color: #1d1b11!important;
        color: #f6f4ef;
    }
    :global(.navIcon):hover{
        cursor: pointer;
        background-color: #9a8d5b4b;
    }
    :global(.maxh){
        height: 100vh;
    }
</style>
<div class="row text-white ms-1 maxh">
    <div class="col-3 align-self-center">
        <div class="row d-flex justify-content-end align-items-center my-4">
            <div class="navIcon w-auto p-2 rounded">
                Home {@html $homeIcon}
            </div>
        </div>
        <div class="row d-flex justify-content-end align-items-center my-4">
            <div class="navIcon w-auto p-2 rounded">
                Explore {@html $exploreIcon}
            </div>
        </div>
        <div class="row d-flex justify-content-end align-items-center my-4">
            <div class="navIcon w-auto p-2 rounded">
                Bookmark {@html $bookmarkIcon}
            </div>
        </div>
        <div class="row d-flex justify-content-end align-items-center my-4">
            <div class="navIcon w-auto p-2 rounded">
                Messages {@html $messageIcon}
            </div>
        </div>
        <div class="row d-flex justify-content-end align-items-center my-4">
            <div class="navIcon w-auto p-2 rounded">
                Profile {@html $profileIcon}
            </div>
        </div>
    </div>
    <div class="col-5">
        test
    </div>
    <div class="col-4">
        test
    </div>
</div>


<!-- <Icons bind:this={icon}/> -->

<!-- --text: #f6f4ef;
--background: #1d1b11;
--primary: #bdb48f;
--secondary: #1a180f;
--accent: #9a8d5b;
 -->