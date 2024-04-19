jQuery(document).ready(function($) {
    const woonftApiUrl = productnft_params.api_url;
    const currentUrl = window.location.href;
    const params = new URLSearchParams(new URL(currentUrl).search);
    var network = 'testnet';
    var txComplete = false;
    var woonftButtonIndex = 0;

    insertGetNftButtons();
    checkUrlParams();

    $(document).on('click', '#claimNftButton', function() {
        handleNftClaim();
    });

    async function checkUrlParams() {
        if (params.has('network')) {
            network = params.get('network');
        }

        if (params.has('transactionHashes') && params.has('woonft-data-index') && params.has('reference')) {
            txComplete = true;
            $('#nftUrlModal').modal('show');
            setTimeout(() => {
                getNftUrl(params.get('reference'));
            }, 3500);
        }
    }

    $('.woonft-mintbase-link-popup').on('click', function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        window.open(url, '_blank');
        $('#congratsModal').modal('hide');
    });

    function insertGetNftButtons() {
        $('tr.order_item').each(function(index) {
            const product = productnft_params.products[index];
            const button = $('<button/>', {
                text: 'Claim a free NFT!',
                class: 'button alt wp-element-button get-nft-button holo-button',
                'data-index': index,
                click: function(e) {
                    e.preventDefault();
                    getNft(index);
                }
            });

            $(this).find('td').first().append('<br/>');
            $(this).find('td').first().append(button);
        });
    }

    async function getNftUrl(reference) {
        try {
            const response = await $.ajax({
                url: `${woonftApiUrl}get-token-link`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ reference: reference }),
                headers: {
                    'x-license-key': productnft_params.api_key
                }
            });

            const resp = JSON.parse(response);
            const link = resp.url;
            $('.woonft-mintbase-link-popup').attr('href', link);

            const indices = params.getAll('woonft-data-index');
            const latestIndex = indices[indices.length - 1];

            localStorage.setItem('woonft-index-' + latestIndex, link);

            indices.forEach(index => {
                const nftLink = localStorage.getItem('woonft-index-' + index);
                $('.get-nft-button[data-index="' + index + '"]').after(`<a href="${nftLink}" class="woonft-mintbase-link-popup" target="_blank">See your NFT on Mintbase!</a>`);
                $('.get-nft-button[data-index="' + index + '"]').remove();
            });
            $('#nftUrlModal').modal('hide');
            $('#congratsModal').modal('show');
        } catch (error) {
            console.error('Error retrieving NFT URL:', error.message);
            window.location.reload();
        }
    }

    async function getNft(index) {
        const product = productnft_params.products[index];

        if (productnft_params.image_type && productnft_params.openai_api_key) {
            const productName = product.name.split(" - ")[0];
            const descriptionText = `${productName}. Make it digital art. Emphasize digital futuristic look and make it abstract.`;

            $('#nftModal').modal('show');
            toggleLoader(true);
            const response = await $.ajax({
                url: `${woonftApiUrl}get-image`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ description: descriptionText }),
                headers: {
                    'x-license-key': productnft_params.api_key,
                    'x-openai-api-key': productnft_params.openai_api_key,
                },
                success: function(response) {
                    const imageDataURI = `data:image/png;base64,${response.image}`;
                    const imageUrl = response.imageUrl;
                    displayImage(imageDataURI, imageUrl, index);
                },
                error: function(jqXHR) {
                    $('#nftModal').modal('hide');
                    toggleLoader(false);
                    if (jqXHR.status === 403) {
                        alert('Service not active.\nCheck your license key.');
                    } else {
                        alert('Connection to AI model failed due to high demand.\nPlease try again.');
                    }
                }
            });
        } else {
            const productImage = product.image_url;

            if(productImage) {
                $('#nftModal').modal('show');
                displayImage(productImage, productImage, index);
            } else {
                alert('No image available for this product.');
            }
        }
    }

    function displayImage(imageDataUri, imageUrl, index) {
        $('#nftImage').data('index', index);
        $('#nftImage').data('url', imageUrl);
        $('#nftImage').attr('src', imageDataUri).show();
        toggleLoader(false);
        $('#claimNftButton').show();
    }

    function handleNftClaim() {
        const image = $('#nftImage').attr('src');
        const index = $('#nftImage').data('index');
        const imageUrl = $('#nftImage').data('url');
        if (!image) {
            alert('No NFT image to load.');
            return;
        }

        $('#nftModal').modal('hide');
        $('#mintModal').modal('show');
        toggleMintLoader(true);

        const url = new URL(currentUrl);
        url.searchParams.append('woonft-data-index', index);

        $.ajax({
            url: `${woonftApiUrl}mint`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                imageUrl: imageUrl,
                name: "WooNFT Art",
                description: productnft_params.products[index].name,
                redirectUrl: url
            }),
            headers: {
                'x-license-key': productnft_params.api_key
            },
            success: (data) => {
                $('#nftButtonRow').remove();
                window.location.href = data.signUrl;
            },
            error: function(jqXHR) {
                if (jqXHR.status === 403) {
                    $('#mintModal').modal('hide');
                    $('#nftModal').modal('show');
                    alert('Service not active.\nCheck your license key.');
                } else {
                    $('#mintModal').modal('hide');
                    $('#nftModal').modal('show');
                    alert('Connection to minter failed due to high demand.\nPlease try again.');
                }
            }
        });
    }

    function toggleLoader(show) {
        $('#loader, #loadingText').toggle(show);
        $('#nftImage, #claimNftButton').toggle(!show);
    }

    function toggleMintLoader(show) {
        $('#loader-mint, #loadingTextMint').toggle(show);
    }
});