document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('insurance-form');
    const insuranceTableBody = document.querySelector('#insurance-table tbody');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value;

        try {
            addInsurance(firstName, lastName, age, phone);
            displayInsurances();
            form.reset();
        } catch (e) {
            alert(e);
        }
    });

    const addInsurance = (firstName, lastName, age, phone) => {
        const insurance = {
            firstName,
            lastName,
            age,
            phone
        };
        //validate age
        if (age < 18 || age > 100) {
            throw new Error('Věk musí být mezi 18 a 100 let.');
        }
        //validate phone format to +420xxxxxxxxx
        if (!phone.match(/^(+420)?[0-9]{7}/)) {
            throw new Error('Telefon musí být ve tvaru +420xxxxxxxxx.');
        }
        let insurances = localStorage.getItem('insurances') ? JSON.parse(localStorage.getItem('insurances')) : [];
        insurances.push(insurance);
        localStorage.setItem('insurances', JSON.stringify(insurances));
    };

    const displayInsurances = () => {
        const insurances = localStorage.getItem('insurances') ? JSON.parse(localStorage.getItem('insurances')) : [];
        insuranceTableBody.innerHTML = '';
        insurances.forEach((insurance) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${insurance.firstName} ${insurance.lastName}</td>
                <td>${insurance.phone}</td>
                <td>${insurance.age}</td>
            `;
            insuranceTableBody.appendChild(tr);
        });
    };

    displayInsurances();
});
