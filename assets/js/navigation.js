
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

        // Handle dropdown clicks on mobile
        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('dropdown-open');
                    
                    // Close other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('dropdown-open');
                        }
                    });
                }
            });
        });

        // Handle sub-dropdown clicks on mobile
        subDropdownItems.forEach(item => {
            const link = item.querySelector('.dropdown-link');
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('sub-dropdown-open');
                    
                    // Close other sub-dropdowns
                    subDropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('sub-dropdown-open');
                        }
                    });
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