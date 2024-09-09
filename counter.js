const { createClient } = supabase;
const isLocalEnvironment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
// const isLocalEnvironment = false;
const supabaseUrl = 'https://tseekljllrtadseeehur.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZWVrbGpsbHJ0YWRzZWVlaHVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3ODg5MTAsImV4cCI6MjA0MTM2NDkxMH0.uzNsW8X43C46_vO_XQ481xeuEZ398V7nVnIMu0LcFY8';
const _supabase = createClient(supabaseUrl, supabaseKey);

function getPageName() {
    return document.location.pathname.split("/").pop().split(".")[0] || 'index';
}

async function incrementCounter() {
    if (!isLocalEnvironment) {
        const pageName = getPageName();
        const { data, error } = await _supabase.rpc('increment_counter', {
            p_page_name: pageName
        });
        if (error) {
            console.error('Error incrementing counter:', error);
            return null;
        } else {
            return data;
        }
    }
    return null;
}

async function updateCounter(count, elementId) {
    const counterElement = document.getElementById(elementId);
    if (!counterElement) return;

    if (isLocalEnvironment) {
        counterElement.textContent = 'Local environment';
    } else if (count !== null) {
        counterElement.textContent = count;
    } else {
        console.error('Unable to update counter');
    }
}

async function updateVisitCount(elementId) {
    const count = await incrementCounter();
    updateCounter(count, elementId);
}
