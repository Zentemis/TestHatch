/**
 * Hatcher Easter Egg — Split Reveal
 *
 * Trigger sequence:
 *   1. Click 5 times anywhere on the page (counter resets after 3 seconds)
 *   2. Then press A while holding Shift
 *   3. The main site splits left/right and the Hatcher overlay slides in from the edges.
 *   4. Press ESC or click a panel to close and restore the site.
 *
 * The site splits outward (left half goes left, right half goes right)
 * while the Hatcher panels slide in from opposite sides.
 */

(function() {
    'use strict';

    const CLICK_THRESHOLD = 5;
    const CLICK_TIMEOUT_MS = 3000;

    let clickCount = 0;
    let clickTimer = null;
    let isTriggered = false;

    const overlay = document.getElementById('hatcherOverlay');
    const mainSite = document.getElementById('mainSite');

    if (!overlay || !mainSite) {
        console.warn('[HatcherEgg] Required elements not found.');
        return;
    }

    /** Reset the click counter and clear the timer. */
    function resetClickCount() {
        clickCount = 0;
        if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;
        }
    }

    /** Handle a click: increment counter, set timeout to reset. */
    function handleClick() {
        if (isTriggered) return;

        clickCount += 1;
        if (clickTimer) clearTimeout(clickTimer);
        clickTimer = setTimeout(resetClickCount, CLICK_TIMEOUT_MS);
    }

    /** Handle keydown: check for Shift+A when clickCount >= threshold. */
    function handleKeyDown(e) {
        if (isTriggered) return;

        // Only activate if clickCount is already at threshold
        if (clickCount >= CLICK_THRESHOLD && e.key === 'A' && e.shiftKey) {
            e.preventDefault();
            activateEasterEgg();
        }

        // Escape to close
        if (isTriggered && e.key === 'Escape') {
            e.preventDefault();
            deactivateEasterEgg();
        }
    }

    /** Activate the split-screen reveal. */
    function activateEasterEgg() {
        isTriggered = true;
        resetClickCount();

        // Split the main site outward — left half goes left, right half goes right
        mainSite.classList.add('hatcher-split-left');

        // Show overlay with sliding panels
        overlay.classList.add('active');
    }

    /** Deactivate the easter egg, restoring the main site. */
    function deactivateEasterEgg() {
        isTriggered = false;

        // Remove the overlay
        overlay.classList.remove('active');

        // Restore the main site
        mainSite.classList.remove('hatcher-split-left');
    }

    // --- Clicking a panel closes it ---
    overlay.addEventListener('click', function(e) {
        // Only close if clicking directly on the overlay or a panel background,
        // not on interactive content inside.
        if (e.target === overlay || e.target.classList.contains('hatcher-panel')) {
            deactivateEasterEgg();
        }
    });

    // --- Register listeners ---
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    // Expose for debugging
    window.__hatcherEgg = {
        activate: activateEasterEgg,
        deactivate: deactivateEasterEgg,
        isActive: () => isTriggered,
        clickCount: () => clickCount
    };

    console.log('[HatcherEgg] Ready. Click ' + CLICK_THRESHOLD + ' times then press Shift+A.');
})();