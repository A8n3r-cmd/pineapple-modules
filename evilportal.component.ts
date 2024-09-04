document.getElementById('deploy_command').addEventListener('click', function() {
    const networkInterface = (document.getElementById('network_interface') as HTMLSelectElement).value;
    const extensionsInterface = (document.getElementById('extensions_interface') as HTMLSelectElement).value;
    const essid = (document.getElementById('essid') as HTMLInputElement).value;
    const scenario = (document.getElementById('phishing_scenario') as HTMLSelectElement).value;

    const command = `wifiphisher -i ${networkInterface} --essid ${essid} -eI ${extensionsInterface} --phishing-scenario ${scenario}`;
    
    (document.getElementById('command_preview') as HTMLElement).textContent = command;

    fetch('/deploy_phishing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
    }).then(response => response.json()).then(result => {
        (document.getElementById('status_output') as HTMLElement).textContent = result.status;
    });
});

window.onload = function() {
    fetch('/get_interfaces').then(response => response.json()).then(interfaces => {
        ['network_interface', 'extensions_interface'].forEach(dropdownId => {
            const dropdown = document.getElementById(dropdownId) as HTMLSelectElement;
            interfaces.forEach((intf: string) => {
                const option = document.createElement('option');
                option.value = intf;
                option.text = intf;
                dropdown.appendChild(option);
            });
        });
    });
};
