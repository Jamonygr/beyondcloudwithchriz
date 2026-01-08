// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// Neon Effects for BeyondCloudWithChriz Blog

$w.onReady(function () {
    
    // ===== NEON EFFECTS - Inject CSS into page =====
    const neonCSS = `
        /* Neon Background */
        body, html, .blog-page-container, main {
            background: 
                radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255, 0, 255, 0.15), transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 30%, rgba(0, 245, 255, 0.12), transparent 50%),
                radial-gradient(ellipse 70% 50% at 50% 80%, rgba(255, 0, 255, 0.1), transparent 50%),
                linear-gradient(rgba(255, 0, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 0, 255, 0.03) 1px, transparent 1px),
                linear-gradient(180deg, #0a0a1a 0%, #0d0015 50%, #050510 100%) !important;
            background-size: 100% 100%, 100% 100%, 100% 100%, 50px 50px, 50px 50px, 100% 100% !important;
            background-attachment: fixed !important;
        }
        
        /* Neon Blog Titles - Cyan glow */
        [data-hook="blog-post-title"], .blog-post-title, h1.post-title, h1 {
            color: #00f5ff !important;
            text-shadow: 0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00a8cc !important;
            letter-spacing: 2px !important;
        }
        
        /* Blog Card Titles - Magenta glow */
        [data-hook="post-title"], .post-title {
            color: #ff00ff !important;
            text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff !important;
            transition: all 0.3s ease !important;
        }
        
        [data-hook="post-title"]:hover, .post-title:hover {
            color: #00f5ff !important;
            text-shadow: 0 0 10px #00f5ff, 0 0 30px #00f5ff !important;
            transform: scale(1.02);
        }
        
        /* Neon Blog Cards */
        [data-hook="post-list-item"], .blog-card, article {
            background: linear-gradient(135deg, rgba(10, 10, 30, 0.9), rgba(20, 5, 40, 0.9)) !important;
            border: 2px solid #ff00ff !important;
            box-shadow: 0 0 10px rgba(255, 0, 255, 0.3), 0 0 20px rgba(0, 245, 255, 0.2) !important;
            border-radius: 8px !important;
            transition: all 0.4s ease !important;
        }
        
        [data-hook="post-list-item"]:hover, .blog-card:hover {
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.4) !important;
            transform: translateY(-5px);
            border-color: #00f5ff !important;
        }
        
        /* Date/Meta in magenta */
        [data-hook="post-date"], .post-date, .post-meta {
            color: #ff00ff !important;
            text-shadow: 0 0 5px rgba(255, 0, 255, 0.5) !important;
        }
        
        /* Read More button */
        [data-hook="read-more-link"], .read-more-link {
            color: #00f5ff !important;
            text-shadow: 0 0 10px #00f5ff !important;
            border: 1px solid #00f5ff !important;
            padding: 8px 20px !important;
            transition: all 0.3s ease !important;
        }
        
        [data-hook="read-more-link"]:hover {
            background: #00f5ff !important;
            color: #0a0a1e !important;
        }
        
        /* Tags */
        [data-hook="post-tags"] a, .post-tag {
            border: 1px solid #ff00ff !important;
            color: #ff00ff !important;
            border-radius: 20px !important;
            transition: all 0.3s ease !important;
        }
        
        [data-hook="post-tags"] a:hover {
            background: #ff00ff !important;
            color: #0a0a1e !important;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = neonCSS;
    document.head.appendChild(style);
    console.log('🌟 Neon effects loaded - BeyondCloudWithChriz');
    // ===== END NEON EFFECTS =====
});
