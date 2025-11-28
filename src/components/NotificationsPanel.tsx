import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, CheckCircle, Film, Tv, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications = [
  {
    id: 1,
    type: "new_release",
    icon: Film,
    title: "New Movie Released",
    message: "Shadow Protocol is now available in Premium",
    time: "2 hours ago",
    isPremium: true,
    read: false,
  },
  {
    id: 2,
    type: "recommendation",
    icon: Tv,
    title: "Recommended for You",
    message: "Based on your viewing history, you might like 'Neon Nights'",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "continue_watching",
    icon: Film,
    title: "Continue Watching",
    message: "You left off at 45% in 'Realm of Legends'",
    time: "Yesterday",
    read: true,
  },
  {
    id: 4,
    type: "premium",
    icon: Crown,
    title: "Premium Exclusive",
    message: "Early access to new episodes available now",
    time: "2 days ago",
    isPremium: true,
    read: true,
  },
];

export const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? ({ ...n, read: true }) : n));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-96 max-w-[90vw] glass border-l border-border/50 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold">Notifications</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-primary/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Mark all as read */}
              <Button
                variant="ghost"
                size="sm"
                className="mb-4 text-primary hover:text-primary/90 hover:bg-primary/10"
                onClick={markAllAsRead}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>

              {/* Notifications List */}
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer ${!notification.read ? "bg-primary/5" : "bg-card/50"
                      }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.isPremium
                            ? "bg-premium/20 text-premium"
                            : "bg-primary/20 text-primary"
                            }`}
                        >
                          <notification.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          {notification.isPremium && (
                            <Badge className="bg-premium text-premium-foreground text-xs">
                              PREMIUM
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State (if no notifications) */}
              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">All caught up!</h3>
                  <p className="text-sm text-muted-foreground">
                    You don't have any notifications right now.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
