<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<!-- Generate Image Modal -->
<div class="modal fade" style="z-index:999999;" id="nftModal" tabindex="-1" role="dialog" aria-labelledby="nftModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="nftModalLabel">NFT Art</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div id="loader" class="spinner"></div>
            <p id="loadingText" style="text-align: center;padding-top: 10px;">
                <span style="font-weight:bold;">Please be patient</span>
                <br/>
                <span>Your unique, one-of-a-kind work of art is being generated...</span>
            </p>
            <img id="nftImage" src="" style="display:none; width: 100%;" class="flicker" onload="jQuery(this).fadeIn();"/>
        </div>
        <button id="claimNftButton" style=" display: block !important;" class="btn btn-primary holo-button">!! Mint this NFT !!</button>
        </div>
    </div>
</div>

<!-- Mint Modal -->
<div class="modal fade" id="mintModal" style="z-index:9999999;" tabindex="-1" role="dialog" aria-labelledby="mintModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="mintModalLabel">Minting</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div id="loader-mint" class="spinner"></div>
                <p id="loadingTextMint" style="text-align: center;padding-top: 10px;">
                    <span style="font-weight:bold;">Please wait.</span>
                    <br/>
                    <span>Your NFT is being minted...</span>
                </p>
        </div>
        </div>
    </div>
</div>

<!-- Waiting URL Modal -->
<div class="modal fade" id="nftUrlModal" style="z-index:9999999;" tabindex="-1" role="dialog" aria-labelledby="nftUrlModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="mintModalLabel">Getting URL</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div id="loader-mint" class="spinner"></div>
                <p id="loadingTextNftUrl" style="text-align: center;padding-top: 10px;">
                    <span style="font-weight:bold;">Please wait.</span>
                    <br/>
                    <span>Getting your NFT url...</span>
                </p>
        </div>
        </div>
    </div>
</div>

<!-- Congrats Modal -->
<div class="modal fade" id="congratsModal" style="z-index:99999999;" tabindex="-1" role="dialog" aria-labelledby="congratsModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="congratsModalLabel">Congrats!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
                <p id="loadingTextCongrats" style="text-align: center;padding-top: 10px;">
                    <span style="font-weight:bold;color:green">Well done</span>
                    <br/>
                    <span>You've minted your own unique NFT.</span>
                    <br/>
                    <span>
                        Head over to 
                        <a class="woonft-mintbase-link-popup" href="" target="_blank">Mintbase</a> 
                        to see and interact with it.
                    </span>
                </p>
        </div>
        </div>
    </div>
</div>
