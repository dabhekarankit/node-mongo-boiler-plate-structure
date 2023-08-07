import firebaseAdmin from "firebase-admin";

const init = () => {
    return firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.applicationDefault(),
    });
};

const firebase = init();

/**
 * send push
 * @param tokens
 * @param payload
 */
export const sendPush = (tokens, payload) => {
    if (tokens.length > 0) {
        firebase
            .messaging()
            .sendToDevice(tokens, payload)
            .then(async (result) => {
                result.results.forEach(async (deviceResult, index) => {
                    if (deviceResult.error) {
                        console.log(deviceResult);
                        // Now use this token to delete it from your DB, or mark it failed according to your requirements.
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
