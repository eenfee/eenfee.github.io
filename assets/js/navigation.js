
        // Mobile menu toggle functionality
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navList = document.querySelector('.nav-list');
        const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
        const subDropdownItems = document.querySelectorAll('.dropdown-item.has-sub-dropdown');

        // Toggle mobile menu
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('mobile-menu-open');
            mobileToggle.setAttribute('aria-expanded', 
                navList.classList.contains('mobile-menu-open') ? 'true' : 'false'
            );
        });

        // Handle dropdown clicks on mobile (double-tap to navigate)
        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            let tappedOnce = false;
            let tapTimeout;

            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (!tappedOnce) {
                        e.preventDefault(); // prevent navigation on first tap
                        tappedOnce = true;
                        item.classList.add('dropdown-open');

                        // Close other dropdowns
                        dropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('dropdown-open');
                            }
                        });

                        // Reset tap after a short delay
                        clearTimeout(tapTimeout);
                        tapTimeout = setTimeout(() => {
                            tappedOnce = false;
                        }, 500);
                    } else {
                        // Second tap goes to link naturally
                        tappedOnce = false;
                        clearTimeout(tapTimeout);
                    }
                }
            });
        });

        // Handle sub-dropdown clicks on mobile (double-tap to follow link)
        subDropdownItems.forEach(item => {
            const link = item.querySelector('.dropdown-link');
            let tappedOnce = false;
            let tapTimeout;

            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (!tappedOnce) {
                        e.preventDefault();
                        tappedOnce = true;
                        item.classList.add('sub-dropdown-open');

                        // Close other sub-dropdowns
                        subDropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('sub-dropdown-open');
                            }
                        });

                        // Reset tap after delay
                        clearTimeout(tapTimeout);
                        tapTimeout = setTimeout(() => {
                            tappedOnce = false;
                        }, 500);
                    } else {
                        tappedOnce = false;
                        clearTimeout(tapTimeout);
                        // allow default navigation
                    }
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-navigation')) {
                navList.classList.remove('mobile-menu-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navList.classList.remove('mobile-menu-open');
                dropdownItems.forEach(item => item.classList.remove('dropdown-open'));
                subDropdownItems.forEach(item => item.classList.remove('sub-dropdown-open'));
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navList.classList.remove('mobile-menu-open');
                dropdownItems.forEach(item => item.classList.remove('dropdown-open'));
                subDropdownItems.forEach(item => item.classList.remove('sub-dropdown-open'));
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });