import axios from "axios"

export const getUserData = async () => {
    try {
        const res = await axios("https://randomuser.me/api/");
        const firstname = res.data.results[0].name.first;
        const lastname = res.data.results[0].name.last;
        const email = res.data.results[0].email;

        return { firstname, lastname, email };
    } catch (error) {
        console.error(error);
    }
}

export const submitUserData = async (payload) => {
    try {
        const res = await axios
            .post("https://acc-test-vjn7.onrender.com/form", payload, {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "letmein",
                },
            })
        return res
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
}