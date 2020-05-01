const {Tracker} = require('../dist/index');

const config = {
    enableCrossOrigin: true,
    apiKeys: {
        laPoste: '',
        DHL: ''
    }
};

const tracker = new Tracker(config);

window.onload = () => {
    const getCarrierButton = document.getElementById('carrier-button');
    const trackingNumberInput = document.getElementById('tracking-number');
    const carrierDiv = document.getElementById('carrier');
    const carrierList = document.getElementById('carrier-list');
    const getInformationButton = document.getElementById('submit');
    const responseDiv = document.getElementById('response');

    for (let i = 0; i < tracker.getCarriersList().length; i++) {
        let option = document.createElement("option");
        option.value = tracker.getCarriersList()[i];
        option.text = tracker.getCarriersList()[i];
        carrierList.appendChild(option);
    }

    getCarrierButton.onclick = () => {
        carrierDiv.innerHTML = tracker.getCourier(trackingNumberInput.value);
    };

    getInformationButton.onclick = () => {
        const number = trackingNumberInput.value;

        const carrier = carrierList.options[carrierList.selectedIndex].value;

        try {
            tracker.getTrackingInformations(number, carrier).then((response) => {
                responseDiv.innerHTML = JSON.stringify(response, null, 2)
            }).catch((e) => {
                console.error(e);
                responseDiv.innerHTML = e;
            });
        } catch (e) {
            console.error(e);
            responseDiv.innerHTML = e;
        }
    }
}