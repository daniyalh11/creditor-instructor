import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, ChevronRight, ChevronDown, Search, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function WidgetsSection() {
  const [showMessages, setShowMessages] = useState(true);
  const [showGroups, setShowGroups] = useState(true);

  const messages = [
    {
      id: 1,
      name: 'Alex Johnson',
      message: 'Hey, did you check the new assignment?',
      time: '2m ago',
      unread: true,
      avatar: '/avatars/01.png'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      message: 'Meeting at 3pm tomorrow',
      time: '1h ago',
      unread: true,
      avatar: '/avatars/02.png'
    },
    {
      id: 3,
      name: 'Mike Chen',
      message: 'Here are the notes from today',
      time: '3h ago',
      unread: false,
      avatar: '/avatars/03.png'
    }
  ];

  const groups = [
    {
      id: 1,
      name: 'Web Dev 2023',
      desc: '12 members',
      img: '/groups/web-dev.png'
    },
    {
      id: 2,
      name: 'Study Group A',
      desc: '8 members',
      img: '/groups/study-group.png'
    },
    {
      id: 3,
      name: 'CS101 Discussion',
      desc: '24 members',
      img: '/groups/cs101.png'
    }
  ];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowMessages(!showMessages)}
              >
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Messages
                </CardTitle>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${showMessages ? 'rotate-180' : ''}`} 
                />
              </div>
            </CardHeader>
            <AnimatePresence>
              {showMessages && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent className="p-0">
                    <div className="px-4 pb-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search messages..."
                          className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </div>
                    </div>
                    <div className="divide-y">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors ${msg.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        >
                          <Avatar>
                            <AvatarImage src={msg.avatar} alt={msg.name} />
                            <AvatarFallback>{msg.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{msg.name}</h3>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                          </div>
                          {msg.unread && (
                            <span className="h-2 w-2 rounded-full bg-blue-600" />
                          )}
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full rounded-t-none border-t">
                      View All Messages <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowGroups(!showGroups)}
              >
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Study Groups
                </CardTitle>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${showGroups ? 'rotate-180' : ''}`} 
                />
              </div>
            </CardHeader>
            <AnimatePresence>
              {showGroups && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Create New Group
                      </Button>
                      <div className="space-y-2">
                        {groups.map(grp => (
                          <div key={grp.id} className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                            <img 
                              src={grp.img} 
                              alt={grp.name} 
                              className="h-8 w-8 rounded-full object-cover shadow-sm" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(grp.name) + '&background=random';
                              }}
                            />
                            <div>
                              <span className="font-medium text-gray-700 hover:text-blue-700 transition-colors">
                                {grp.name}
                              </span>
                              <div className="text-xs text-gray-500">{grp.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default WidgetsSection;